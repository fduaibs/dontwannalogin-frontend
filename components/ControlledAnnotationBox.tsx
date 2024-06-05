import { useState } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, LinearProgress } from '@mui/material';
import { AliasInput } from './AliasInput';
import { AnnotationBoxController } from './AnnotationBoxController';
import { AnnotationBox } from './AnnotationBox';
import { Funcao, IChatGPT } from '../Types/ITypes';
import { useAnnotation } from '../hooks/useAnnotation';
import { AudioPlayer } from './AudioPlayer';

export interface ControlledAnnotationBox {
  id: string | string[] | undefined;
  setSnackPack: any;
}

export const ControlledAnnotationBox = ({
  id,
  setSnackPack,
}: ControlledAnnotationBox) => {
  const { fetchedAnnotation, getAnnotation, isAnnotationLoading } = useAnnotation()

  const trueId = fetchedAnnotation?._id
  const [annotation, setAnnotation] = useState<string>(fetchedAnnotation?.data);
  const [loading, setLoading] = useState<boolean>(false);

  const { chatGpt, playerAudio } = useAnnotation()

  const handleChatGPTFunction = async (chatGPTFunction: Funcao) => {
    setLoading(true)

    const body: IChatGPT = {
      funcao: chatGPTFunction,
      text: annotation
    }

    const response = await chatGpt(body)

    setAnnotation(response.data.text)
    setLoading(false)
  }

  const handlePlayAudio = async () => {
    await playerAudio(annotation)
  }

  return (
      <Grid container>
        <Grid
          container
          xs={12}
          sm={12}
          spacing={2}>
          <AudioPlayer/>
          <Grid container md={12} spacing={3}>
            <Grid xs={12} md={9}>
              <AliasInput id={id} trueId={trueId} setSnackPack={setSnackPack} />
            </Grid>
            <Grid md={3}>
              <AnnotationBoxController
                trueId={trueId}
                annotation={annotation}
                setAnnotation={setAnnotation}
                data={fetchedAnnotation?.data}
                setSnackPack={setSnackPack}
              />
            </Grid>
          </Grid>
          <Grid xs={10} md={10}>
            <AnnotationBox disabeld={loading} annotation={annotation}  setAnnotation={setAnnotation} />
            {loading && <LinearProgress color='info' style={{ top: '-1px' }} />}
          </Grid>
          <Grid container xs={1} md={1} spacing={0}>
            {!loading && (<>
              <Grid container>
                <Button key='Resumir' onClick={() => handleChatGPTFunction(Funcao.Resumir)}>
                  Resumir
                </Button>
              </Grid>
              <Grid container>
                <Button key='Destacar' onClick={() => handleChatGPTFunction(Funcao.Destacar)}>
                  Destacar
                </Button>
              </Grid>
              <Grid container>
                <Button key='Organizar' onClick={() => handleChatGPTFunction(Funcao.Organizar)}>
                  Organizar
                </Button>

              </Grid>
              <Grid container>
                <Button key='Explicar' onClick={() => handleChatGPTFunction(Funcao.Explicar)}>
                  Explicar
                </Button>

              </Grid>
              <Grid container>
                <Button key='Questionar' onClick={() => handleChatGPTFunction(Funcao.Questionar)}>
                  Questionar
                </Button>
              </Grid>
              <Grid container>
                <Button key='Topificar' onClick={() => handleChatGPTFunction(Funcao.Topificar)}>
                  Topificar
                </Button>
              </Grid>
              <Grid container>
                <Button key='Corrigir' onClick={() => handleChatGPTFunction(Funcao.Corrigir)}>
                  Corrigir
                </Button>
              </Grid>
              <Grid container>
                <Button key='Corrigir' onClick={() => handlePlayAudio()}>
                  Ouvir
                </Button>
              </Grid>
            </>
            )}
          </Grid>
        </Grid>
      </Grid>
  )
}
