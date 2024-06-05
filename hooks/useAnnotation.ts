import { useContext } from "react";
import { AnnotationContext, AnnotationContextData } from "../context/AnnotationContext";

function useAnnotation(): AnnotationContextData {
  const context = useContext(AnnotationContext);

  return context;
}

export {
  useAnnotation
}
