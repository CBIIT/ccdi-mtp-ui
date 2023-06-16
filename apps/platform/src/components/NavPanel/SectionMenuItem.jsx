import React from 'react';
import { Avatar, ListItem, ListItemText } from '@material-ui/core';
import classNames from 'classnames';
import { Draggable } from 'react-beautiful-dnd';
import { DragIndicator } from '@material-ui/icons';
import { scroller } from 'react-scroll';

import navPanelStyles from './navPanelStyles';
import useSectionOrder from '../../hooks/useSectionOrder';

function SectionMenuItem({ index, section }) {
  const { id, name, shortName, color } = section.props.definition;
  const classes = navPanelStyles({ color });
  const { shouldRender } = useSectionOrder();

  const handleSectionButtonClick = sectionId => {
    scroller.scrollTo(sectionId, {
      duration: 500,
      smooth: true,
      offset: -230, // CHANGE MADE: to scroll back -(230) px
    });
  };

  return (
    <Draggable draggableId={id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem
            button
            className={classes.listItem}
            onClick={() => handleSectionButtonClick(id)}
          >
            <Avatar
              className={classNames({
                [classes.listItemAvatar]: true,
                [classes.listItemAvatarHasData]: shouldRender(section),
              })}
            >
              {shortName}
            </Avatar>
            <ListItemText
              className={classes.listItemText}
              primary={name}
              primaryTypographyProps={{
                className: classes.listItemLabel,
              }}
            />
            <DragIndicator className={classes.dragIndicator} />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}

export default SectionMenuItem;
