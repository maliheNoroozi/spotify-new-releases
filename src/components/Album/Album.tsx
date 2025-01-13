import {
  Card,
  CardActionArea,
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
      <CardActionArea>
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

        <CardContent>
          <Link href={album.uri} underline="hover">
            <Typography variant="body1" noWrap>
              {album.name}
            </Typography>
          </Link>
          <div>
            {album.artists.map(artist => (
              <Link href={artist.uri} key={artist.id} underline="hover">
                {artist.name}
              </Link>
            ))}
          </div>
          <Typography variant="body1" className={classes.releaseDate}>
            Release Date: {formatDateByLocale(album.release_date)}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
