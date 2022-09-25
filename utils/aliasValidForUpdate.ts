export const aliasValidForUpdate = (
  alias: string | undefined,
  id: string | string[] | undefined
) => {
  if (!alias)
    return {
      valid: false,
      message: 'O apelido não pode ser vazio',
      severity: 'error',
    };

  if (alias == id)
    return {
      valid: false,
      message: 'O apelido precisa ser diferente do atual',
      severity: 'error',
    };

  return {
    valid: true,
    message: '',
    severity: '',
  };
};
