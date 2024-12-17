export function getAvatarColor(index: number): string {
	const colors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500'];
	return colors[index % colors.length];
}

export function getAvatarText(index: number): string {
	return `A${index}`;
}
