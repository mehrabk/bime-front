export const NumberVerifier = (input) => {
  const lastChar = input.charAt(input.length - 1);
  if (input.length === 1 && input === '-') return input;

  if (lastChar >= '0' && lastChar <= '9') {
    return input;
  }
  if (lastChar >= '۰' && lastChar <= '۹') {
    return input
      .substring(0, input.length - 1)
      .concat(String.fromCharCode(lastChar.charCodeAt(0) - 1728));
  }
  if (lastChar === '.' && !input.substring(0, input.length - 1).includes('.')) {
    return input;
  }
  if (input.length === 1 && (lastChar === '-' || lastChar === '-')) {
    return '-';
  }
  return input.substring(0, input.length - 1);
};
export const NumberWithCharacterVerifier = (input) => {
  const lastChar = input.charAt(input.length - 1);
  if (lastChar >= '0' && lastChar <= '9') {
    return input;
  }
  if (lastChar >= '۰' && lastChar <= '۹') {
    return input
      .substring(0, input.length - 1)
      .concat(String.fromCharCode(lastChar.charCodeAt(0) - 1728));
  }
  if (lastChar === '.' && !input.substring(0, input.length - 1).includes('.')) {
    return input;
  }
  if (lastChar === '-' && !input.substring(0, input.length - 1).includes('-')) {
    return input;
  }
  if (input.length === 1 && (lastChar === '-' || lastChar === '-')) {
    return '-';
  }
  return input.substring(0, input.length - 1);
};
export const PhoneNumberVerifier = (input) => {
  if (input.length > 11) {
    return input.substring(0, input.length - 1);
  }
  const lastChar = input.charAt(input.length - 1);
  if (lastChar >= '0' && lastChar <= '9') {
    return input;
  }
  if (lastChar >= '۰' && lastChar <= '۹') {
    return input
      .substring(0, input.length - 1)
      .concat(String.fromCharCode(lastChar.charCodeAt(0) - 1728));
  }
  return input.substring(0, input.length - 1);
};

export const ToEnglishNumber = (input) => {
  const verNum = NumberVerifier(input);
  return verNum.replace(/[۰-۹]/g, (chr) =>
    String.fromCharCode(chr.charCodeAt(0) - 1728)
  );
};

export const ToNumberWithCharacter = (input) => {
  const verNum = NumberWithCharacterVerifier(input);
  return verNum.replace(/[۰-۹]/g, (chr) =>
    String.fromCharCode(chr.charCodeAt(0) - 1728)
  );
};

export const NumberThousabdSeprator = (input) => {
  if (input === undefined) return '';
  if (typeof input === 'string') {
    const engNum = ToEnglishNumber(input);
    return Number(engNum.replace(/,/g, ''))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }
  return input.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const RealNumber = (input) => {
  if (typeof input === 'string') {
    return Number(input.replace(/,/g, ''));
  }
  return input;
};
