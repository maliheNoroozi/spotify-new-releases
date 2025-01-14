import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material"
import { Album as AlbumType } from "../../types"
import { formatDateByLocale } from "../../utils/format-time"

import classes from "./Album.module.css"

interface Props {
  album: AlbumType
}

export default function Album({ album }: Props) {
  return (
    <Card sx={{ width: album.images[0].width }}>
      <CardMedia
        component="img"
        image={album.images[0].url}
        title={album.name}
        alt={album.name}
        sx={{
          height: album.images[0].height,
          width: album.images[0].width,
        }}
      />

      <CardContent className={classes.flex}>
        <Link href={album.uri} underline="hover">
          <Typography variant="body1" noWrap className={classes.name}>
            {album.name}
          </Typography>
        </Link>
        <Box>
          {album.artists.map(artist => (
            <Link href={artist.uri} key={artist.id} underline="hover">
              {artist.name}
            </Link>
          ))}
        </Box>
        <Typography variant="body1" className={classes.releaseDate}>
          Release Date: {formatDateByLocale(album.release_date)}
        </Typography>
      </CardContent>
    </Card>
  )
}
