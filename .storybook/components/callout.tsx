import { FC } from 'react';
import snarkdown from 'snarkdown';

type Variant = 'neutral' | 'positive' | 'info' | 'warning';

const VARIANT_DEFAULT_ICON: Partial<Record<Variant, string>> = {
  info: 'ℹ️',
  warning: '⚠️',
};

interface CalloutProps {
  title?: string;
  icon?: string;
  variant?: Variant;
  children: string;
}

export const Callout: FC<CalloutProps> = ({
  title,
  icon,
  children,
  variant = 'neutral',
  ...props
}) => {
  const appliedIcon = icon ?? VARIANT_DEFAULT_ICON[variant];

  return (
    <div className={`callout callout-${variant}`} {...props}>
      {appliedIcon ? (
        <span aria-hidden className="callout-icon">
          {appliedIcon}
        </span>
      ) : null}
      <div className="callout-body">
        {title ? (
          <div dangerouslySetInnerHTML={{ __html: snarkdown(title) }} />
        ) : null}
        <div className="callout-content">{children}</div>
      </div>
    </div>
  );
};
