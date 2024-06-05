import TextField from '@mui/material/TextField';

export interface AnnotationBox {
  annotation: string;
  setAnnotation: any;
  disabeld: boolean
}

export const AnnotationBox = ({ annotation, setAnnotation, disabeld }: AnnotationBox) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotation(event.target.value);
  };
  
  return (
    <TextField
      id='outlined-multiline-static'
      multiline
      fullWidth
      disabled={disabeld}
      rows={25}
      value={annotation}
      onChange={handleChange}
    />
  )
}
