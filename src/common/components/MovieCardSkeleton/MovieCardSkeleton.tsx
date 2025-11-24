import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import Skeleton from "@mui/material/Skeleton"
import Box from "@mui/material/Box"
import CardActions from "@mui/material/CardActions"

export const MovieCardSkeleton = () => {
    return (
        <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
            <Skeleton variant="rectangular" height={380} />
            <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
                    <Skeleton variant="text" width="60%" height={32} />
                    <Skeleton variant="rectangular" width={50} height={24} sx={{ borderRadius: 1 }} />
                </Box>
                <Skeleton variant="text" width="40%" height={24} />
                <Skeleton variant="text" width="100%" height={20} sx={{ mt: 1 }} />
                <Skeleton variant="text" width="80%" height={20} />
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between", px: 2, pb: 2 }}>
                <Skeleton variant="text" width={80} height={20} />
                <Skeleton variant="circular" width={40} height={40} />
            </CardActions>
        </Card>
    )
}
