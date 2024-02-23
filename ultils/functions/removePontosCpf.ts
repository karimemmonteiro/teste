export default function removeNonNumericChars(cpf: string) {
    return cpf.replace(/\D/g, '');
  }