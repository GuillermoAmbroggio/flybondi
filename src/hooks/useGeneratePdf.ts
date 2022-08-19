import jsPDF, { DocumentProperties, jsPDFOptions } from 'jspdf';
import ReactDOMServer from 'react-dom/server';
import logo from '../assets/logo.png';

type IProps = {
  content: JSX.Element;
  options?: jsPDFOptions;
  properties?: DocumentProperties;
  filename?: string;
  automaticDownload?: boolean;
};

const useGeneratePdf = async ({
  content,
  options,
  properties,
  filename,
  automaticDownload,
}: IProps) => {
  const optionsDefault: jsPDFOptions = {
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  };
  const doc = new jsPDF(options ?? optionsDefault);

  doc.setProperties(
    properties ?? {
      title: 'Comprobante de vuelo',
      subject: 'Comprobante de vuelo',
      author: 'Flybondy',
      creator: 'Flybondy',
    },
  );

  const elementToString = ReactDOMServer.renderToString(content);

  await doc.addFont('Open Sans', 'Open Sans', 'normal');
  await doc.setFont('Open Sans');
  await doc.html(elementToString);
  await doc.addImage(logo, 'PNG', 210, 20, 170, 33);

  doc.output('dataurlnewwindow', { filename });
  if (automaticDownload) {
    doc.save(filename);
  }

  return;
};

export default useGeneratePdf;
