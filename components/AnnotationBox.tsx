import TextField from '@mui/material/TextField';

export interface AnnotationBox {
  annotation: string;
  setAnnotation: any;
}

export const AnnotationBox = ({ annotation, setAnnotation }: AnnotationBox) => {

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnnotation(event.target.value);
  }

  return (
    <TextField
      id="outlined-multiline-static"
      multiline
      fullWidth
      rows={25}
      value={annotation}
      onChange={handleChange}
    />
  );
};
