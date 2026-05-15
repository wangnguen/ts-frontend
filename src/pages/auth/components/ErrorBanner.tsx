interface Props {
	message: string;
}

export function ErrorBanner({ message }: Props) {
	if (!message) return null;
	return (
		<div
			className="p-3.5 rounded-2xl text-sm font-medium flex items-start gap-2.5"
			style={{
				background: "rgba(239,68,68,0.07)",
				border: "2px solid rgba(239,68,68,0.18)",
				color: "#B91C1C",
			}}
		>
			<svg className="w-4 h-4 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
				<path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
			</svg>
			{message}
		</div>
	);
}
