import { Modal } from 'antd';

type Arguments = {
  time?: number;
  title: string;
  message?: string;
  permanent?: boolean;
};

const alertSuccess = ({ time, title, message, permanent }: Arguments) => {
  let secondsToGo = time ?? 5;

  const modal = Modal.success({
    title,
    content: message ?? '',
    okText: 'Continuar',
  });

  if (!permanent) {
    const timer = setInterval(() => {
      secondsToGo -= 1;
    }, 1000);

    setTimeout(() => {
      clearInterval(timer);
      modal.destroy();
    }, secondsToGo * 1000);
  }
};

export default alertSuccess;
