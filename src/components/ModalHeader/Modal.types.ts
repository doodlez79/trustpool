import React from 'react';

export type ModalHeaderProps = {
  title: string,
  loading?: boolean

  leftContent?: React.ReactNode,
  rightContent?: React.ReactNode
  longTitle?: boolean

}
