import React from 'react';
import { Form } from 'react-bootstrap';
import { accordionChildren } from '../../sections/accordion-section/constants';
import './accordion.css';

interface AccordionFormContentProps {
  children: accordionChildren[];
  editable: boolean;
  onRadioChange: (value: string, questionIndex: number) => void;
  renderFooter?: () => React.ReactNode;
}

const AccordionFormContent: React.FC<AccordionFormContentProps> = ({ children, editable, onRadioChange, renderFooter }) => {
  const handleRadioChange = (questionIndex: number, value: string) => {
    if (editable) {
      onRadioChange(value, questionIndex);
    }
  };

  return (
    <Form className="accordion-form">
      {children.map((each: accordionChildren, index: number) => {
        return (
          <div key={index} className="accordion-question">
            {each.type === "radio" && each.options ?
              <Form.Group className="accordion-radio-options">
                <Form.Label className="accordion-radio-label">{each.question}</Form.Label>
                <div className='accordion-options-container'>
                  {each.options.map((option: string, optionIndex: number) => (
                    <Form.Check
                      className='radio-options'
                      key={optionIndex}
                      type="radio"
                      name={`${each.question}`}
                      label={option}
                      defaultChecked={option === "No"}
                      disabled={!editable}
                      onChange={() => handleRadioChange(index, option)}
                      value={option}
                    />
                  ))}
                </div>
              </Form.Group>
              :
              each.type === "text" &&
              <div className="accordion-textfield">
                <Form.Label htmlFor={`textfield-${index}`}>{each.question}</Form.Label>
                <Form.Control
                  type="text"
                  id={`textfield-${index}`}
                  disabled={!editable}
                />
              </div>
            }
          </div>
        );
      })}
      {renderFooter && (
        <div className="accordion-footer">
          {renderFooter()}
        </div>
      )}
    </Form>
  );
};

export default AccordionFormContent;
