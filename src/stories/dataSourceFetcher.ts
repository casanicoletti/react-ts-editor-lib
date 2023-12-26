import { useQuery } from "react-query";
export type ResultWithCount<T> = {
    items: T[], total: number
}

export const useGamesDatasource = <T,>(page: number = 1, page_size = 10, onComplete?: (data: ResultWithCount<T>) => void) => {
    const rawg_api = "3baefc4234bc4bf69bcb372453174397";
    const fetchGames = () => fetch(`https://api.rawg.io/api/games?page=${page}&page_size=${page_size}&key=${rawg_api}`)
        .then(s => s.json())
        .then(s => {
            const total = s.count as number
            s.results as T[]
            return <ResultWithCount<T>>{ items: s.results as T, total }
        });
    return useQuery(`games_${page}_${page_size}`, fetchGames, { onSuccess: onComplete })
}