import ObservationDetailContent from "@/components/observations/ObservationDetailContent";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ObservationDetailPage({ params }: Props) {
  const { id } = await params;
  return <ObservationDetailContent id={id} />;
}
