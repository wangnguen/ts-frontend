import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgotPasswordSchema, type ForgotPasswordInput } from "@lib/schemas/auth";
import {
	AuthCard,
	ErrorBanner,
	FieldInput,
	SubmitButton,
	BackLink,
	AuthDivider,
} from "../components";

interface Props {
	loading: boolean;
	error: string;
	onSubmit: (data: ForgotPasswordInput) => Promise<void>;
}

export function FormStep({ loading, error, onSubmit }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<ForgotPasswordInput>({
		resolver: zodResolver(forgotPasswordSchema),
	});

	return (
		<>
			<div className="text-center mb-6">
				<div className="flex justify-center mb-4">
					<div
						className="w-16 h-16 rounded-2xl flex items-center justify-center"
						style={{
							background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(168,85,247,0.12))",
							border: "2px solid rgba(124,58,237,0.2)",
							boxShadow: "0 8px 24px rgba(124,58,237,0.15)",
						}}
					>
						<svg
							className="w-8 h-8"
							style={{ color: "var(--color-primary)" }}
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={1.8}
								d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
							/>
						</svg>
					</div>
				</div>
				<h1 className="text-2xl font-extrabold" style={{ color: "var(--color-text)" }}>
					Quên mật khẩu?
				</h1>
				<p className="text-sm mt-2 font-medium" style={{ color: "var(--color-muted)" }}>
					Nhập email để nhận link đặt lại mật khẩu
				</p>
			</div>

			<AuthCard>
				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<ErrorBanner message={error} />
					<FieldInput
						id="email"
						label="Địa chỉ email"
						type="email"
						placeholder="you@example.com"
						error={errors.email}
						registration={register("email")}
					/>
					<SubmitButton loading={loading} loadingText="Đang gửi...">
						Gửi link đặt lại mật khẩu
					</SubmitButton>
				</form>

				<AuthDivider />
				<BackLink to="/login">Quay lại đăng nhập</BackLink>
			</AuthCard>
		</>
	);
}
