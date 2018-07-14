import React from "react";
import { IconButton, Button, Menu, MenuItem } from "material-ui";
import { Favorite, FavoriteBorder, Dehaze } from "material-ui-icons";
import PropTypes from "prop-types";

const LButton = props => {
  return (
    <span onClick={props.handleClick}>
      <IconButton color="secondary">{props.children}</IconButton>
    </span>
  );
};

function LikeButton(props) {
  return (
    <LButton color="secondary" handleClick={props.handleclick}>
      {props.liked ? <Favorite /> : <FavoriteBorder />}
    </LButton>
  );
}

LikeButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  liked: PropTypes.bool.isRequired
};
function DrawerButton(props) {
  return (
      <IconButton >
        <Dehaze />
      </IconButton>
  );
}

function MenuButton(props) {
  return (
    <div>
      <span onClick={props.handleSelect}>
        <Button>{props.menuName}</Button>
      </span>
      <Menu>
        {props.menuItems.map(item => {
          return <MenuItem>{item}</MenuItem>;
        })}
      </Menu>
    </div>
  );
}
MenuButton.propTypes = {
  handleClick: PropTypes.func.isRequired,
  menuName: PropTypes.string.isRequired,
  menuItems: PropTypes.array.isRequired
};
export { LikeButton, DrawerButton, MenuButton };
