import Image from "next/image";

const Footer = () => {
	return (
		<div className="flex flex-col">
			<div className="m-10 flex w-fit min-w-[50vw] flex-col gap-y-8 divide-y-[1px] divide-slate-600 self-center align-middle opacity-60">
				<div className="flex w-auto justify-center space-x-40 ">
					<div className="flex flex-col space-y-2">
						<h3 className="text-lg font-semibold">Product</h3>
						<p className="pl-2 text-slate-500">lorem ipsum1</p>
						<p className="pl-2 text-slate-500">lorem ipsum2</p>
						<p className="pl-2 text-slate-500">lorem ipsum3</p>
						<p className="pl-2 text-slate-500">lorem ipsum4</p>
						<p className="pl-2 text-slate-500">lorem ipsum5</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h3 className="text-lg font-semibold">Information</h3>
						<p className="pl-2 text-slate-500">lorem ipsum1</p>
						<p className="pl-2 text-slate-500">lorem ipsum2</p>
						<p className="pl-2 text-slate-500">lorem ipsum3</p>
						<p className="pl-2 text-slate-500">lorem ipsum4</p>
						<p className="pl-2 text-slate-500">lorem ipsum5</p>
					</div>
					<div className="flex flex-col space-y-2">
						<h3 className="text-lg font-semibold">Company</h3>
						<p className="pl-2 text-slate-500">lorem ipsum1</p>
						<p className="pl-2 text-slate-500">lorem ipsum2</p>
						<p className="pl-2 text-slate-500">lorem ipsum3</p>
						<p className="pl-2 text-slate-500">lorem ipsum4</p>
						<p className="pl-2 text-slate-500">lorem ipsum5</p>
					</div>
				</div>
				<div className="flex justify-around pt-3">
					<Image
						src="/logo.svg"
						alt="logo"
						width="0"
						height="0"
						sizes="100vw"
						className="m-2 w-fit self-center"
					/>
					<div className="mb-auto mt-auto flex space-x-4">
						<p>Terms</p>
						<p>Privacy</p>
						<p>Cookies</p>
					</div>
					<div className="mb-auto mt-auto flex space-x-4">
						<p>linkedin</p>
						<p>fb</p>
						<p>steam</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Footer;
