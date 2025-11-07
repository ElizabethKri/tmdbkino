import Grid from "@mui/material/Grid"
import Paper from "@mui/material/Paper"
import {TodolistItem} from "./TodolistItem/TodolistItem"
import {useFetchTodolistsQuery} from "@/features/todolists/api/todolistsApi.ts";

export const Todolists = () => {
  // const todolists = useAppSelector(selectTodolists)
  //
  // const dispatch = useAppDispatch()
  //
  // useEffect(() => {
  //   dispatch(fetchTodolistsTC())
  // }, [])

  const {data} = useFetchTodolistsQuery()
  //console.log(data)

  return (
    <>
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
