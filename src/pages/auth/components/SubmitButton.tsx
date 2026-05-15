import type { ReactNode } from "react";

interface Props {
	loading: boolean;
	disabled?: boolean;
	loadingText?: string;
	children: ReactNode;
	type?: "submit" | "button";
	onClick?: () => void;
}

export function SubmitButton({
	loading,
	disabled,
	loadingText = "Đang xử lý...",
	children,
	type = "submit",
	onClick,
}: Props) {
	const isDisabled = loading || disabled;
	return (
		<button
			type={type}
			disabled={isDisabled}
			onClick={onClick}
			className="w-full py-3 px-4 rounded-2xl text-sm font-bold tracking-wide transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
			style={{
				background: isDisabled
					? "linear-gradient(135deg, #C4B5FD, #DDD6FE)"
					: "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)",
				color: "#FFFFFF",
				boxShadow: isDisabled ? "none" : "var(--clay-shadow-btn)",
				transform: "translateY(0px)",
			}}
			onMouseEnter={(e) => {
				if (!isDisabled) {
					e.currentTarget.style.background = "linear-gradient(135deg, #6D28D9 0%, #9333EA 100%)";
					e.currentTarget.style.boxShadow = "var(--clay-shadow-btn-hover)";
					e.currentTarget.style.transform = "translateY(-2px)";
				}
			}}
			onMouseLeave={(e) => {
				if (!isDisabled) {
					e.currentTarget.style.background = "linear-gradient(135deg, #7C3AED 0%, #A855F7 100%)";
					e.currentTarget.style.boxShadow = "var(--clay-shadow-btn)";
					e.currentTarget.style.transform = "translateY(0px)";
				}
			}}
			onMouseDown={(e) => {
				if (!isDisabled) e.currentTarget.style.transform = "translateY(1px)";
			}}
			onMouseUp={(e) => {
				if (!isDisabled) e.currentTarget.style.transform = "translateY(-2px)";
			}}
		>
			{loading ? (
				<span className="flex items-center justify-center gap-2">
					<svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
						<circle className="opacity-30" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-80" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
					</svg>
					{loadingText}
				</span>
			) : (
				children
			)}
		</button>
	);
}
