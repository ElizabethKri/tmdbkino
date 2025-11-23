import "./App.css"
import {selectThemeMode} from "@/app/app-slice"
import {ErrorSnackbar, Header, Footer} from "@/common/components"
import {useAppSelector} from "@/common/hooks"
import {Routing} from "@/common/routing"
import {getTheme} from "@/common/theme"
import CssBaseline from "@mui/material/CssBaseline"
import {ThemeProvider} from "@mui/material/styles"
import styles from "./App.module.css"
import {useGlobalLoading} from "@/common/hooks/useGlobalLoading.ts";
import {LinearProgress} from "@mui/material";

export const App = () => {

  const themeMode = useAppSelector(selectThemeMode)

  const theme = getTheme(themeMode)

  const isGlobalLoading = useGlobalLoading()


  // if (isLoading) {
  //   return (
  //     <div className={styles.circularProgressContainer}>
  //       <CircularProgress size={150} thickness={3} />
  //     </div>
  //   )
  // }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.app}>
        <CssBaseline />
        <Header />
        {isGlobalLoading && <LinearProgress />}
        <main className={styles.main}>
          <Routing />
        </main>
        <Footer />
        <ErrorSnackbar />
      </div>
    </ThemeProvider>
  )
}
