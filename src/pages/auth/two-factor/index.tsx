import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { otpSchema, type OtpInput as OtpFormValues } from "@lib/schemas/auth";
import { useTwoFactorStore } from "./store";
import { AuthLogo, AuthCard, ErrorBanner, OtpInput, SubmitButton, BackLink, AuthDivider } from "../components";

export default function TwoFactorPage() {
	const navigate = useNavigate();
	const { loading, error, submit } = useTwoFactorStore();

	const {
		control,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<OtpFormValues>({
		resolver: zodResolver(otpSchema),
		defaultValues: { otp: "" },
	});

	const otp = watch("otp");
	const isComplete = otp.length === 6;

	return (
		<div className="min-h-screen flex items-center justify-center px-4 relative overflow-hidden">
			{/* Blob decorations */}
			<div
				className="clay-blob blob-float w-64 h-64 -top-10 -left-10"
				style={{ background: "rgba(167,139,250,0.28)" }}
			/>
			<div
				className="clay-blob blob-float-delay w-56 h-56 -bottom-16 -right-12"
				style={{ background: "rgba(249,115,22,0.20)" }}
			/>

			<div className="w-full max-w-md relative z-10">
				<div className="text-center mb-8">
					<AuthLogo />

					<div className="flex justify-center mb-3">
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
									d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
								/>
							</svg>
						</div>
					</div>

					<h1 className="text-2xl font-extrabold" style={{ color: "var(--color-text)" }}>
						Xác thực 2 bước
					</h1>
					<p className="text-sm mt-2 font-medium" style={{ color: "var(--color-muted)" }}>
						Nhập mã 6 chữ số từ ứng dụng xác thực
					</p>
				</div>

				<AuthCard>
					<form onSubmit={handleSubmit((data) => submit(data.otp, navigate))}>
						<ErrorBanner message={error || errors.otp?.message || ""} />
						{(error || errors.otp) && <div className="mb-4" />}

						<Controller
							name="otp"
							control={control}
							render={({ field }) => <OtpInput value={field.value} onChange={field.onChange} />}
						/>

						<SubmitButton loading={loading} disabled={!isComplete} loadingText="Đang xác thực...">
							Xác nhận mã
						</SubmitButton>
					</form>

					<AuthDivider />
					<BackLink to="/login">Quay lại đăng nhập</BackLink>
				</AuthCard>

				<p className="text-center text-xs mt-5 font-medium" style={{ color: "var(--color-muted)" }}>
					Dùng Google Authenticator, Authy, hoặc ứng dụng tương tự
				</p>
			</div>
		</div>
	);
}
