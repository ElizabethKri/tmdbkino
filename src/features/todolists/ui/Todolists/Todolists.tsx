import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistItem} from "./TodolistItem/TodolistItem"
import {useFetchTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";
import Box from "@mui/material/Box";
import {containerSx} from "@/common/styles";
import {TodolistSkeleton} from "@/features/todolists/ui/Todolists/TodolistSkeleton/TodolistSkeleton.tsx";

export const Todolists = () => {

  const {data, isLoading} = useFetchTodolistsQuery()


  // const todolists = useAppSelector(selectTodolists)
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  if (isLoading) {
    return (
        <Box sx={containerSx} style={{ gap: "32px" }}>
          {Array(3)
              .fill(null)
              .map((_, id) => (
                  <TodolistSkeleton key={id} />
              ))}
        </Box>
    )
  }




  //console.log(data)
  // const [trigger, {data}] = useLazyFetchTodolistsQuery()
  // const fetchTodosHandler = () => trigger()

  return (
    <>
      {/*<button onClick={refetch}>actual</button>*/}
      {/*<button onClick={fetchTodosHandler}>get todos</button>*/}
      {/*<Skeleton variant={'circular'} width={40} height={40}/>*/}
      {data?.map((todolist: any) => (
        <Grid key={todolist.id}>
          <Paper sx={{ p: "0 20px 20px 20px" }}>
            <TodolistItem todolist={todolist} />
          </Paper>
        </Grid>
      ))}
    </>
  )
}
