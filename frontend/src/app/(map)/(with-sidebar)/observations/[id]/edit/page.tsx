import ObservationEditForm from "@/components/observations/ObservationEditForm";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function EditObservationPage({ params }: Props) {
  const { id } = await params;

  return (
    <div>
      <ObservationEditForm id={id} />
    </div>
  );
}
