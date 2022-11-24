import React from 'react';
import { Alert } from 'antd';

function ErrorMessage({ errorNetwork }) {
  let message = 'Ошибка. Перезагрузите страницу и попробуйте еще раз.';
  message = [errorNetwork ? (message = 'Ошибка сети. Проверьте подключение к интернету') : message];
  return <Alert message="Error" description={message} type="error" showIcon />;
}

export default ErrorMessage;
