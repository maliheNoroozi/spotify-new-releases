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
        sx={{ height: images[0]?.height || 300 }}
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
        <Box className={classes.artists} data-testid="album-artists">
          {artists.map((artist, index) => (
            <span key={artist.id}>
              <Link href={artist.uri} underline="hover" color="textPrimary">
                {artist.name}
              </Link>
              {index < artists.length - 1 && ", "}
            </span>
          ))}
        </Box>
        <Typography variant="body2" className={classes.releaseDate}>
          Release Date: {formatDateByLocale(release_date)}
        </Typography>
      </CardContent>
    </Card>
  )
}
