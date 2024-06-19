import styles from "../../styles/loader.module.css";

const loader = () => {
	return (
		<div
			className="flex  h-[256px] w-[413px] flex-col items-center 	justify-center  rounded-[16px] border-[2px] border-gray-800 bg-gradient-to-t from-[#404040] to-[#49505700]
			  font-poppins font-bold  text-white backdrop-blur-[50px] "
		>
			<div className={styles.banterloader}>
				<div className={`${styles.banterloader__box}`} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
				<div className={styles.banterloader__box} />
			</div>
			<div className="mt-[50px] text-[20px] leading-[32px] text-[#D9D9D9]">Loading...</div>
		</div>
	);
};

export default loader;
