import { useState } from 'react'

interface MutationState<TData, TError> {
    isPending: boolean
    data: TData | null
    error: TError | null
}

interface MutationResult<TData, TError, TVariables> extends MutationState<TData, TError> {
    mutate: (options?: { variables: TVariables }) => Promise<TData | null>
    reset: () => void
}

interface MutationOptions<TData, TError, TVariables> {
    mutationFn: (options: { variables: TVariables }) => Promise<TData>
    onSuccess?: (data: TData) => void | Promise<void>
    onError?: (error: TError) => void | Promise<void>
}

export function useCustomMutation<
    TData = unknown, 
    TError = Error, 
    TVariables = Record<string, unknown>
>({
    mutationFn,
    onSuccess,
    onError,
}: MutationOptions<TData, TError, TVariables>): MutationResult<TData, TError, TVariables> {
    const [state, setState] = useState<MutationState<TData, TError>>({
        isPending: false,
        data: null,
        error: null,
    })

    const mutate = async (options?: { variables: TVariables }): Promise<TData | null> => {
        setState(prev => ({ ...prev, isPending: true, error: null }))

        try {
            const data = await mutationFn({ variables: options?.variables as TVariables })
            setState({ isPending: false, data, error: null })
            
            if (onSuccess) {
                await Promise.resolve(onSuccess(data))
            }
            
            return data
        } catch (error) {
            const typedError = error as TError
            setState({
                isPending: false,
                data: null,
                error: typedError,
            })
            
            if (onError) {
                await Promise.resolve(onError(typedError))
            }
            
            return null
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
