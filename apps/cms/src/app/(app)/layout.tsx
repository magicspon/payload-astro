export default function Rootlayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html>
			<head>
				<title>Hi!</title>
			</head>
			<body>{children}</body>
		</html>
	)
}
