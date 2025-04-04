import { useState } from 'react'

interface MutationState<TData, TError> {
    isPending: boolean
    data: TData | null
    error: TError | null
}

interface MutationResult<TData, TError> extends MutationState<TData, TError> {
    mutate: (options?: { variables: any }) => Promise<void>
    reset: () => void
}

interface MutationOptions<TData> {
    mutationFn: (options: { variables: any }) => Promise<TData>
}

export function useCustomMutation<TData = unknown, TError = Error>({
    mutationFn,
}: MutationOptions<TData>): MutationResult<TData, TError> {
    const [state, setState] = useState<MutationState<TData, TError>>({
        isPending: false,
        data: null,
        error: null,
    })

    const mutate = async (options?: { variables: any }) => {
        setState(prev => ({ ...prev, isPending: true, error: null }))

        try {
            const data = await mutationFn({ variables: options?.variables })
            setState({ isPending: false, data, error: null })
        } catch (error) {
            setState({
                isPending: false,
                data: null,
                error: error as TError,
            })
        }
    }

    const reset = () => {
        setState({
            isPending: false,
            data: null,
            error: null,
        })
    }

    return {
        ...state,
        mutate,
        reset,
    }
}
