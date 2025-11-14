import Text from './Text';

export default function ErrorMessage({ errorMessage }) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <Text
        as="h1"
        content={errorMessage || 'Something went wrong. Please try again.'}
        MyClass="text-red-600 text-xl"
      />
    </div>
  );
}
