export const updateAnnotationData = async (
  annotation: string,
  id: string | string[] | undefined
) => {
  const updatedAnnotation = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ data: annotation }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const response = async () => {
    if (updatedAnnotation?.ok === true && updatedAnnotation?.bodyUsed) {
      return await updatedAnnotation.json();
    }
    if (updatedAnnotation?.ok === false) {
      const { message } = await updatedAnnotation.json();
      return message;
    }
  };

  return {
    statusCode: updatedAnnotation.status,
    statusText: updatedAnnotation.statusText,
    message: await response(),
  };
};

export const updateAlias = async (
  id: string | string[] | undefined,
  alias: string | string[] | undefined
) => {
  const updatedAlias = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`,
    {
      method: "PATCH",
      body: JSON.stringify({ alias: alias }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );

  const response = async () => {
    if (updatedAlias?.ok === true && updatedAlias?.bodyUsed) {
      return await updatedAlias.json();
    }
    if (updatedAlias?.ok === false) {
      const { message } = await updatedAlias.json();
      return message;
    }
  };

  return {
    statusCode: updatedAlias.status,
    statusText: updatedAlias.statusText,
    message: await response(),
  };
};
