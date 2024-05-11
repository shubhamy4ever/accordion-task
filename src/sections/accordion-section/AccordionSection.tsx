import React, { useState } from 'react';
import AccordionComponent from '../../components/accordion/accordion';
import { accordionData, AccordionItem } from './constants';
import { Accordion, Button } from 'react-bootstrap';
import AccordionFormContent from '../../components/accordion/accordion-formcontent';

const AccordionSection: React.FC = () => {
  const [globalValue, setGlobalValue] = useState<string[]>(
    accordionData.accordions.flatMap(accordion =>
      accordion.children.map(child =>
        child.type === "radio" ? "No" : ""
      )
    )
  );
  const [editableAccordions, setEditableAccordions] = useState<boolean[]>([true, ...accordionData.accordions.map(() => false)]);
  const [formChanged, setFormChanged] = useState<boolean[]>(accordionData.accordions.map(() => false));

  const handleRadioChange = (accordionId: number, questionIndex: number, value: string) => {
    const updatedGlobalValue = [...globalValue];
    updatedGlobalValue[accordionId * accordionData.accordions[0].children.length + questionIndex] = value;
    setGlobalValue(updatedGlobalValue);

    setFormChanged(prev => {
      const updated = [...prev];
      updated[accordionId] = true;
      return updated;
    });
  };

  const handleSave = (accordionId: number) => {
    if (accordionId === accordionData.accordions.length - 1) {
      return;
    }

    const updatedEditableAccordions = [...editableAccordions];

    const accordionStartIndex = accordionId * accordionData.accordions[0].children.length;
    const accordionEndIndex = accordionStartIndex + accordionData.accordions[accordionId].children.length;

    const anyNoValue = globalValue.slice(accordionStartIndex, accordionEndIndex).includes("No");

    if (anyNoValue) {
      for (let i = accordionId + 1; i < updatedEditableAccordions.length; i++) {
        updatedEditableAccordions[i] = false;
      }
    } else {
      updatedEditableAccordions[accordionId + 1] = true;
    }

    setEditableAccordions(updatedEditableAccordions);

    setFormChanged(prev => {
      const updated = [...prev];
      updated[accordionId] = false;
      return updated;
    });
  };

  const renderSaveCancel = (accordionId: number) => {
    return (
      <div>
        <Button variant="primary" onClick={() => handleSave(accordionId)} className='m-2'>Save</Button>
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
