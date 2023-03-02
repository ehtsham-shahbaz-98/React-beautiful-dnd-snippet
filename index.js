import React from "react";
import {
  FaPlusSquare,
  FaMinusSquare,
  FaArrowAltCircleRight,
} from "react-icons/fa";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

const BeautifulDnd = () => {
  const [expanded, setExpanded] = React.useState(false);
  const [categories, setCategories] = React.useState([
    { id: 1, name: "Catergory 1" },
    { id: 2, name: "Category 2" },
  ]);
  const [items, setItems] = React.useState([
    { id: 1, name: "English", category: 1 },
    { id: 2, name: "French", category: 1 },
    { id: 3, name: "Spanish", category: 1 },
    { id: 4, name: "Portugese", category: 2 },
    { id: 5, name: "Arabic", category: 2 },
    { id: 6, name: "Urdu", category: 2 },
  ]);

  React.useEffect(() => {
    setExpanded("panel1");
  }, []);

  const rearangeArr = (arr, sourceIndex, destIndex) => {
    const arrCopy = [...arr];
    const [removed] = arrCopy.splice(sourceIndex, 1);
    arrCopy.splice(destIndex, 0, removed);

    return arrCopy;
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === "Categories") {
      setCategories(rearangeArr(categories, source.index, destination.index));
    } else if (destination.droppableId !== source.droppableId) {
      setItems((items) =>
        items.map((item) =>
          item.id === parseInt(result.draggableId)
            ? {
                ...item,
                category: parseInt(result.destination.droppableId),
              }
            : item
        )
      );
    } else {
      setItems(rearangeArr(items, source.index, destination.index));
    }
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <Row style={{ marginTop: "2%", marginBottom: "2%" }}>
          <Droppable droppableId="Categories" type="droppableItem">
            {(provided) => (
              <div ref={provided.innerRef}>
                {categories.map((category, index) => (
                  <Col md={6}>
                    <div style={{ width: "80%" }}>
                      <Accordion
                        expanded={expanded === "panel1"}
                        onChange={handleChange("panel1")}
                      >
                        <AccordionSummary
                          key={index}
                          expandIcon={
                            expanded === "panel1" ? (
                              <FaMinusSquare color="red" fontSize="16px" />
                            ) : (
                              <FaPlusSquare color="green" fontSize="16px" />
                            )
                          }
                          aria-controls="panel1bh-content"
                          id="panel1bh-header"
                        >
                          <Typography
                            sx={{
                              fontSize: "16px",
                              width: "100%",
                              flexShrink: 0,
                            }}
                          >
                            {index === 0 ? "Languages" : "Selected Languages"}
                          </Typography>
                        </AccordionSummary>

                        <Draggable
                          draggableId={`category-${category.id}`}
                          key={`category-${category.id}`}
                          index={index}
                        >
                          {(parentProvider) => (
                            <div
                              ref={parentProvider.innerRef}
                              {...parentProvider.draggableProps}
                            >
                              <Droppable droppableId={category.id.toString()}>
                                {(provided) => (
                                  <div ref={provided.innerRef}>
                                    {items
                                      .filter(
                                        (item) => item.category === category.id
                                      )
                                      .map((item, index) => {
                                        return (
                                          <Draggable
                                            draggableId={item.id.toString()}
                                            key={item.id}
                                            index={index}
                                          >
                                            {(provided) => (
                                              <AccordionDetails
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                sx={{
                                                  backgroundColor: "#fff",
                                                  border: "1px solid #dcdcdc",
                                                  borderRadius: "5px",
                                                  margin: "10px",
                                                }}
                                              >
                                                <div
                                                  style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                      "space-between",
                                                  }}
                                                >
                                                  <Typography
                                                    sx={{
                                                      fontSize: "16px",
                                                    }}
                                                  >
                                                    {item.name}
                                                  </Typography>
                                                  <div
                                                    style={{
                                                      marginTop: "10px",
                                                      cursor: "pointer",
                                                    }}
                                                    onClick={() =>
                                                      handleSelectLang(item.id)
                                                    }
                                                  >
                                                    <FaArrowAltCircleRight
                                                      color="#3661eb"
                                                      style={{
                                                        fontSize: "18px",
                                                      }}
                                                    />
                                                  </div>
                                                </div>
                                              </AccordionDetails>
                                            )}
                                          </Draggable>
                                        );
                                      })}
                                  </div>
                                )}
                              </Droppable>
                            </div>
                          )}
                        </Draggable>
                      </Accordion>
                    </div>
                  </Col>
                ))}
              </div>
            )}
          </Droppable>
        </Row>
      </DragDropContext>
    </div>
  );
};

export default BeautifulDnd;
