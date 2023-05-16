import Navhome from '../../components/Home/Navhome';
import ModalComponent from '../../components/Plan/ModalComponent';
import AccordionComponent from '../../components/Plan/AccordionComponent';
import './Plan.css';

export default function Plan() {
  return (
    <>
      <Navhome hideLinks={false} />
      <ModalComponent />
      <AccordionComponent />
    </>
  );
}
