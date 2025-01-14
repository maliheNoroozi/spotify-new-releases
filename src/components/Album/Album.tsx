import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Link,
  Typography,
} from "@mui/material"
import { Album as AlbumType } from "@/types"
import { formatDateByLocale } from "@/utils/format-time"

import classes from "./Album.module.css"

interface Props {
  album: AlbumType
}

export function Album({ album }: Props) {
  const { images, name, uri, artists, release_date } = album

  return (
    <Card className={classes.card}>
      <CardMedia
        component="img"
        image={images[0]?.url}
        title={name}
        alt={name}
        className={classes.image}
        sx={{ height: album.images[0].height || 300 }}
      />
      <CardContent className={classes.content}>
        <Link
          href={uri}
          underline="hover"
          color="textPrimary"
          className={classes.fullWidth}
        >
          <Typography variant="body1" noWrap>
            {name}
          </Typography>
        </Link>
        <Box className={classes.artists}>
          {artists.map(artist => (
            <Link
              href={artist.uri}
              key={artist.id}
              underline="hover"
              color="textPrimary"
            >
              {artist.name}
            </Link>
          ))}
        </Box>
        <Typography variant="body2" className={classes.releaseDate}>
          Release Date: {formatDateByLocale(release_date)}
        </Typography>
      </CardContent>
    </Card>
  )
}
