export type ActionType = "select" | "edit" | "delete" | { custom: boolean, value: string }

export type ActionProps<T> = {
    onAction: (action: ActionType, item: T) => boolean;
}