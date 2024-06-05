import { Box, Button, Grid, IconButton, ImageList, ImageListItem, ImageListItemBar, LinearProgress, Menu, MenuItem, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useAnnotation } from '../hooks/useAnnotation';
import DeleteIcon from '@mui/icons-material/Delete';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import AddIcon from '@mui/icons-material/Add';
import InfiniteScroll from "react-infinite-scroll-component";

export default function ControlledImagesBox() {
  const { createImage, getImages } = useAnnotation()

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      await createImage(selectedFiles)
    }
  }

  return (
    <Grid>
      <Grid item md={1}>
        <input
          accept="image/*"
          style={{ display: 'none' }}
          id="upload-files"
          type="file"
          multiple
          onChange={(e) => handleFileChange(e)}
        />
        <label htmlFor="upload-files">
          <Button
            fullWidth
            variant='outlined'
            color="info"
            component="span"
            startIcon={<AddIcon />}
          >
          </Button>
        </label>
      </Grid>
      <Grid item md={12} mt={3}>
        <ImagesBox />
      </Grid>
    </Grid >
  )
}


function ImagesBox() {

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));
  const { images, deleteImages, hasMore, getImages, isAnnotationLoading } = useAnnotation()
  const [selectedFileId, setSelectedFileId] = useState<string>('');

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setSelectedFileId(id);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = () => {
    deleteImages(selectedFileId)
    handleMenuClose();
  };

  const handleDownload = async () => {

    const image = images.find((image) => image.uploadName === selectedFileId)

    if (image === undefined)
      return

    fetch(image.downloadURL)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.blob();
      })
      .then(blob => {
        // Aqui você pode adicionar código para manipular o blob, como baixá-lo
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = image.originalName; // Nome do arquivo para download
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(error => console.error('There was an error fetching the image:', error));


  };


  return (
    <Grid container spacing={2}>
      <Grid item>
        <InfiniteScroll
          dataLength={images.length}
          next={getImages}
          hasMore={hasMore}
          loader={
            isAnnotationLoading && <LinearProgress />
          }
        >
          <ImageList cols={isSmallScreen ? 1 : 6} gap={16}>
            {images.map((file, index) => (
              <ImageListItem key={index} style={{ 'background': '#1976d3', 'padding': '3px', border: '1px solid black  '}}>
                <img
                  src={file.downloadURL}
                  srcSet={`/${file.downloadURL}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  alt={file.originalName}
                  style={{ width: '100%', height: '12rem' }}
                />
                <ImageListItemBar
                  title={file.originalName}
                  position="bottom"
                  style={{ 'color': 'rgb(255, 255, 255)' }}
                  sx={{
                    '& .MuiImageListItemBar-title': {
                      fontSize: '0.7rem', // Ajuste o tamanho da fonte do título conforme necessário
                    },
                  }}
                  actionIcon={
                    <>
                      <IconButton
                        sx={{ color: 'rgb(255, 255, 255)' }}
                        aria-label={`info about`}
                        onClick={(e) => handleMenuClick(e, file.uploadName)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleDownload()}>
                          <Box mr={1}>
                            <FileDownloadIcon color='disabled' />
                          </Box>
                          Download
                        </MenuItem>
                        <MenuItem onClick={() => handleDelete()}>
                          <Box mr={1}>
                            <DeleteIcon color='error' />
                          </Box>
                          Delete
                        </MenuItem>
                      </Menu>
                    </>
                  }
                />
              </ImageListItem>
            ))}
          </ImageList>
        </InfiniteScroll>
      </Grid>
    </Grid>
  )
}