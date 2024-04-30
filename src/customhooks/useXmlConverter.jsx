import { useEffect, useState } from "react";

function useXmlConverter(xmlString) {
  const [jsonResult, setJsonResult] = useState("");

  useEffect(() => {
    if (!xmlString) {
      console.log("XML string is empty");
      setJsonResult("");
      return;
    }

    const convertXmlToJson = () => {
      // Create a DOMParser object
      const parser = new DOMParser();

      // Parse the XML string into a DOM object
      const xmlDoc = parser.parseFromString(xmlString, "text/xml");

      if (!xmlDoc) {
        console.error("Failed to parse XML document");
        setJsonResult("");
        return;
      }

      // Function to recursively convert DOM nodes to JSON
      const xmlNodeToJson = (node) => {
        const obj = {};

        // If the node has child nodes, iterate over them
        if (node.childNodes.length > 0) {
          node.childNodes.forEach((childNode) => {
            // If the child node is an element node, convert it
            if (childNode.nodeType === Node.ELEMENT_NODE) {
              if (!obj[childNode.nodeName]) {
                obj[childNode.nodeName] = xmlNodeToJson(childNode);
              } else {
                if (!Array.isArray(obj[childNode.nodeName])) {
                  obj[childNode.nodeName] = [obj[childNode.nodeName]];
                }
                obj[childNode.nodeName].push(xmlNodeToJson(childNode));
              }
            } else if (childNode.nodeType === Node.TEXT_NODE) {
              const text = childNode.textContent.trim(); // Trim whitespace
              if (text) {
                obj["_text"] = text;
              }
            }
          });
        }

        // Add attributes if present
        if (node.attributes && node.attributes.length > 0) {
          obj["@attributes"] = {};
          for (let i = 0; i < node.attributes.length; i++) {
            const attribute = node.attributes[i];
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }

        return obj;
      };

      // Convert the XML DOM object to JSON
      const json = xmlNodeToJson(xmlDoc.documentElement);

      // Set the JSON result
      setJsonResult(JSON.stringify(json, null, 2));
    };

    convertXmlToJson();
  }, [xmlString]);

  return jsonResult;
}

export default useXmlConverter;
