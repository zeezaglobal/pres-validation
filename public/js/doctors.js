let selectedDoctorId = null;
let selectedBtn = null;

document.addEventListener('DOMContentLoaded', function () {

    document.querySelectorAll('.validate-btn').forEach((btn) => {


        btn.addEventListener('click', function () {
            selectedDoctorId = this.getAttribute('data-id');
            selectedBtn = this;
            const modal = new bootstrap.Modal(document.getElementById('confirmModal'));
            modal.show();
        });
    });

    document.getElementById('confirmValidateBtn').addEventListener('click', function () {
        if (!selectedDoctorId || !selectedBtn) return;
        selectedBtn.querySelector('.btn-text').classList.add('d-none');
        selectedBtn.querySelector('.loader').classList.remove('d-none');

        fetch(`/doctors/validate/${selectedDoctorId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: selectedDoctorId })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.result.success) {
                    location.reload();
                } else {
                    alert('Validation failed!');
                    selectedBtn.querySelector('.btn-text').classList.remove('d-none');
                    selectedBtn.querySelector('.loader').classList.add('d-none');
                }
            })
            .catch(() => {
                alert('Validation failed!');
                selectedBtn.querySelector('.btn-text').classList.remove('d-none');
                selectedBtn.querySelector('.loader').classList.add('d-none');
            });


        bootstrap.Modal.getInstance(document.getElementById('confirmModal')).hide();
    });
});
