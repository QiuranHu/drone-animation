import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from 'reactstrap';

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const [modal, setModal] = useState(false);

  const toggleModal = () => setModal(!modal);
  return (
    <div>
      <Navbar color="light" light expand="md">
        <NavbarBrand>无人机仿真</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <Button outline color="primary" onClick={toggleModal}>关于</Button>
            </NavItem>
          </Nav>
        </Collapse>
      </Navbar>


      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>关于</ModalHeader>
        <ModalBody>
          模拟无人机的飞行。
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>关闭</Button>{' '}
        </ModalFooter>
      </Modal>
    </div>
  );
}

export default Header;