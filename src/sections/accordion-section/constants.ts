export type accordionChildren = { question: string, type: string, options?: string[] };

export type AccordionItem = {
  id: number;
  heading: string;
  children: accordionChildren[]
};

export type AccordionDataType = { accordions: AccordionItem[] };

export const accordionData: AccordionDataType = {
  "accordions": [
    {
      "id": 1,
      "heading": "Hotlist",
      "children": [
        {
          "question": "How satisfied are you with our product?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "How likely are you to recommend our service to a friend?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Are you a new or existing customer?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "What improvements would you suggest?",
          "type": "text"
        },
        {
          "question": "What features do you like the most?",
          "type": "text"
        }
      ]
    },
    {
      "id": 2,
      "heading": "Buying Platform",
      "children": [
        {
          "question": "How easy was it to use our website?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Did you find the information you were looking for?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "How satisfied are you with our customer support?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Please provide any additional comments:",
          "type": "text"
        },
        {
          "question": "Please provide any additional comments:",
          "type": "text"
        }
      ]
    },
    {
      "id": 3,
      "heading": "Hello world",
      "children": [
        {
          "question": "Did you find our products reasonably priced?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "How would you rate the quality of our products?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Would you recommend our products to others?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "What additional products would you like to see in our inventory?",
          "type": "text"
        },
        {
          "question": "What additional products would you like to see in our inventory?",
          "type": "text"
        }
      ]
    },
    {
      "id": 4,
      "heading": "Final Output",
      "children": [
        {
          "question": "How satisfied are you with our delivery services?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "How would you rate the packaging of your order?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Are you likely to purchase from us again?",
          "type": "radio",
          "options": ["Yes", "No", "N/A"]
        },
        {
          "question": "Please suggest any improvements for our delivery process:",
          "type": "text"
        },
        {
          "question": "Please suggest any improvements for our delivery process:",
          "type": "text"
        }
      ]
    }
  ]
}
