import { motion } from 'framer-motion';
import IconLineDirection from '../icon/IconLineDirection';

interface Props {
  cls?: string;
  colorSvg?: string;
  title: string;
}

const BtnCommon = ({ cls, colorSvg, title }: Props) => {
  const buttonVariants = {
    hover: {
      x: 15,
      width: '100%',
      opacity: 0.3,
    },
  };

  return (
    <motion.button
      whileHover='hover'
      variants={buttonVariants}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={`dark:text-white relative flex justify-between items-center gap-3 text-left cursor-pointer mt-3 rounded-full ${cls}`}
    >
      <p className='text-sm'>{title}</p>
      <IconLineDirection color={colorSvg} />
    </motion.button>
  );
};

export default BtnCommon;
