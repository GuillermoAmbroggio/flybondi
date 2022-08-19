export type TextVariants =
  | 'titleBig'
  | 'title'
  | 'subtitle'
  | 'bodyBig'
  | 'bodyTitle'
  | 'body'
  | 'bodyBold'
  | 'bodySmall'
  | 'bodyExtraSmall'
  | 'label'
  | 'link';

export type ColorsText =
  | 'primary'
  | 'secondary'
  | 'success'
  | 'error'
  | 'highlight'
  | 'disabled'
  | 'colordefault';

export type TextProps = {
  variant?: TextVariants;
  color?: ColorsText;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties | undefined;
  onClick?: () => void;
};
