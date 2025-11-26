import Box from "@mui/material/Box"
import Skeleton from "@mui/material/Skeleton"
import {MovieCardSkeleton} from "@/common/components/MovieCardSkeleton/MovieCardSkeleton"

type MoviesSectionSkeletonProps = {
    count?: number
}

export const MoviesSectionSkeleton = ({count = 6}: MoviesSectionSkeletonProps) => {
    return (
        <Box sx={{ mb: 6 }}>
            <Skeleton variant="text" width={200} height={40} sx={{ mt: 4, mb: 2 }} />
            <Skeleton variant="text" width={150} height={24} sx={{ mb: 3 }} />
            <Box
                sx={{
                    display: 'flex',
                    gap: 2,
                    overflowX: 'auto',
                    mt: 2,
                    pb: 2,
                }}
            >
                {Array.from({ length: count }).map((_, index) => (
                    <Box
                        key={index}
                        sx={{
                            minWidth: { xs: '280px', sm: '300px', md: '320px' },
                            maxWidth: { xs: '280px', sm: '300px', md: '320px' },
                            flexShrink: 0,
                        }}
                    >
                        <MovieCardSkeleton />
                    </Box>
                ))}
            </Box>
        </Box>
    )
}

