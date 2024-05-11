import React from 'react';
import { Accordion } from 'react-bootstrap';

type Props = {
  children: React.ReactNode;
  style: React.CSSProperties;
};

const AccordionComponent: React.FC<Props> = ({ children, ...props }) => {
  return (
    <Accordion {...props}>
      {children}
    </Accordion>
  );
};


export default AccordionComponent;
