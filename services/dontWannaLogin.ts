export const createAnnotation = async () => {
  const base64BasicToken = Buffer.from(
    `${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASS}`
  ).toString('base64');

  const createdAnnotation = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/`,
    {
      method: 'POST',
      body: JSON.stringify({ alias: '', password: '', data: '' }),
      headers: {
        Authorization: `Basic ${base64BasicToken}`,
      },
    }
  );

  return {
    statusCode: createdAnnotation.status,
    data: await createdAnnotation.json(),
    message: createdAnnotation.statusText,
  };
};

export const updateAnnotationData = async (
  annotation: string,
  id: string | string[] | undefined
) => {
  const base64BasicToken = Buffer.from(
    `${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASS}`
  ).toString('base64');

  const updatedAnnotation = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ data: annotation }),
      headers: {
        Authorization: `Basic ${base64BasicToken}`,
        'Content-type': 'application/json; charset=UTF-8',
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
  const base64BasicToken = Buffer.from(
    `${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASS}`
  ).toString('base64');

  const updatedAlias = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}`,
    {
      method: 'PATCH',
      body: JSON.stringify({ alias: alias }),
      headers: {
        Authorization: `Basic ${base64BasicToken}`,
        'Content-type': 'application/json; charset=UTF-8',
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

export const findByAliasOrId = async (id: string | string[] | undefined) => {
  const base64BasicToken = Buffer.from(
    `${process.env.NEXT_PUBLIC_BASIC_AUTH_USER}:${process.env.NEXT_PUBLIC_BASIC_AUTH_PASS}`
  ).toString('base64');

  const foundAnnotation = await fetch(
    `${process.env.NEXT_PUBLIC_API_BASEURL}/annotations/${id}/find-by-alias-or-id`,
    {
      method: 'GET',
      headers: {
        Authorization: `Basic ${base64BasicToken}`,
        'Content-type': 'application/json; charset=UTF-8',
      },
    }
  ).then((res) => res.json());

  return foundAnnotation;
};
