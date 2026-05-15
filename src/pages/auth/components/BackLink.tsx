import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface Props {
	to: string;
	children: ReactNode;
}

export function BackLink({ to, children }: Props) {
	return (
		<p className="text-center text-sm">
			<Link
				to={to}
				className="inline-flex items-center gap-1.5 font-semibold transition-all duration-150 cursor-pointer"
				style={{ color: "var(--color-muted)" }}
				onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-primary)")}
				onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
			>
				<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
				</svg>
				{children}
			</Link>
		</p>
	);
}
