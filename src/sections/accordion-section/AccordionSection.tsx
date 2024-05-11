import React, { useState } from 'react';
import AccordionComponent from '../../components/accordion/accordion';
import { accordionData, AccordionItem } from './constants';
import { Accordion, Button } from 'react-bootstrap';
import AccordionFormContent from '../../components/accordion/accordion-formcontent';

interface AccordionData {
  [accordionId: number]: { [questionIndex: number]: string };
}

const AccordionSection: React.FC = () => {
  const [accordionValues, setAccordionValues] = useState<AccordionData>(() => {
    const initialValue: AccordionData = {};
    accordionData.accordions.forEach((accordion, accordionIndex) => {
      initialValue[accordionIndex] = {};
      accordion.children.forEach((child, childIndex) => {
        initialValue[accordionIndex][childIndex] = child.type === "radio" ? "No" : "";
      });
    });
    return initialValue;
  });

  console.log(accordionValues);

  const [editableAccordions, setEditableAccordions] = useState<boolean[]>([true, ...accordionData.accordions.map(() => false)]);
  const [formChanged, setFormChanged] = useState<boolean[]>(accordionData.accordions.map(() => false));

  const handleRadioChange = (accordionId: number, questionIndex: number, value: string) => {
    setAccordionValues(prevValues => ({
      ...prevValues,
      [accordionId]: {
        ...prevValues[accordionId],
        [questionIndex]: value
      }
    }));

    setFormChanged(prev => {
      const updated = [...prev];
      updated[accordionId] = true;
      return updated;
    });
  };

  const handleSave = (accordionIndex: number) => {
    if (accordionIndex === accordionData.accordions.length - 1) {
      return;
    }

    const updatedEditableAccordions = [...editableAccordions];
    const anyNoValue = Object.values(accordionValues[accordionIndex]).includes("No");

    for (let i = accordionIndex + 1; i < updatedEditableAccordions.length; i++) {
      const anyNoValueNew = accordionValues[i - 1] && Object.values(accordionValues[i - 1]).includes("No");
      if (anyNoValue || !anyNoValueNew) {
        updatedEditableAccordions[i] = !anyNoValue;
      } else {
        updatedEditableAccordions[i] = false;
      }
    }

    setEditableAccordions(updatedEditableAccordions);

    setFormChanged(prev => {
      const updated = [...prev];
      updated[accordionIndex] = false;
      return updated;
    });
  };

  const renderSaveCancel = (accordionIndex: number) => {
    return (
      <div>
        <Button variant="primary" onClick={() => handleSave(accordionIndex)} className='m-2'>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </div>
    );
  };

  return (
    <>
      <AccordionComponent style={{ margin: '0 10vw' }}>
        {accordionData.accordions.map((each: AccordionItem, index: number) => (
          <Accordion.Item key={each.id} eventKey={index.toString()}>
            <Accordion.Header>{each.heading}</Accordion.Header>
            <Accordion.Body>
              <AccordionFormContent
                children={each.children}
                editable={editableAccordions[index]}
                onRadioChange={(value: string, questionIndex: number) => handleRadioChange(index, questionIndex, value)}
                renderFooter={formChanged[index] ? () => renderSaveCancel(index) : undefined}
              />
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </AccordionComponent>
    </>
  );
};

export default AccordionSection;
